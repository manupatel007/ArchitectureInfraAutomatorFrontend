"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { ResourceNode, Connection } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface AiPromptFormProps {
  onResourcesGenerated: (resources: ResourceNode[]) => void
  onConnectionsGenerated: (connections: Connection[]) => void
}

export function AiPromptForm({ onResourcesGenerated, onConnectionsGenerated }: AiPromptFormProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [streamedDescription, setStreamedDescription] = useState("")
  const [error, setError] = useState<string | null>(null)

  const processJsonStream = async (
    reader: ReadableStreamDefaultReader,
    onResources: (resources: ResourceNode[]) => void,
    onConnections: (connections: Connection[]) => void,
    onUpdate: (description: string) => void
  ) => {
    const decoder = new TextDecoder();
    let buffer = '';
    let jsonState = {
      resources: [] as ResourceNode[],
      connections: [] as Connection[],
      description: ''
    };
  
    const updateState = (newPartial: string) => {
      try {
        const parsed = JSON.parse(newPartial);
        if (parsed.description) {
          jsonState.description = parsed.description;
          onUpdate(jsonState.description);
        }
        if (parsed['architecture'].resources) {
          jsonState.resources = parsed['architecture'].resources;
          onResources([...jsonState.resources]);
        }
        if (parsed['architecture'].connections) {
          jsonState.connections = parsed['architecture'].connections;
          onConnections([...jsonState.connections]);
        }
      } catch (e) {
        // Ignore parsing errors for partial chunks
      }
    };
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
  
      buffer += decoder.decode(value, { stream: true });
      updateState(buffer);
      // try {
      //   const finalData = JSON.parse(jsonState.d);
      //   onResources(finalData['architecture'].resources || []);
      //   onConnections(finalData['architecture'].connections || []);
      // } catch (e) {
      //   console.error('Final JSON parsing error:', e);
      // }

    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)
    setStreamedDescription("")
    setError(null)

    try {
      // Clear existing resources and connections
      onResourcesGenerated([])
      onConnectionsGenerated([])

      try {
        const response = await fetch('http://127.0.0.1:8000/stream?iprompt='+prompt);
    
        if (!response.ok || !response.body) throw new Error('Request failed');
    
        await processJsonStream(
          response.body.getReader(),
          onResourcesGenerated,
          onConnectionsGenerated,
          setStreamedDescription
        );
    
      } catch (err) {
        setError("Failed to connect to the AI service. Please try again.")
        console.error(err)
      }
    } catch (err) {
      setError("An error occurred while generating the architecture. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Describe your Azure architecture needs..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={isGenerating} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Architecture"
          )}
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      {streamedDescription && (
        <Card className="p-4">
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-2">Generated Description</h3>
            <div className="whitespace-pre-wrap">{streamedDescription}</div>
          </div>
        </Card>
      )}
    </form>
  )
}

