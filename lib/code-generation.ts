import { getCurrentUser } from "./auth"

interface CodeTemplate {
  function: {
    [key: string]: string
  }
  appService: {
    [key: string]: string
  }
}

const codeTemplates: CodeTemplate = {
  function: {
    "http-trigger": `import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.')

    const name = (req.query.name || (req.body && req.body.name))
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
    context.res = {
        status: 200,
        body: responseMessage
    }
}

export default httpTrigger`,
    "timer-trigger": `import { AzureFunction, Context } from "@azure/functions"

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const timeStamp = new Date().toISOString()
    context.log('Timer trigger function started:', timeStamp)

    context.res = {
        status: 200,
        body: 'Timer trigger function executed successfully'
    }
}

export default timerTrigger`,
    "blob-trigger": `import { AzureFunction, Context } from "@azure/functions"

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    context.log("Blob trigger function processed blob \\n Name:", context.bindingData.name, "\\n Blob Size:", myBlob.length, "Bytes")
    
    context.res = {
        status: 200,
        body: 'Blob trigger function executed successfully'
    }
}

export default blobTrigger`
  },
  appService: {
    "express": `const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express.js Web App!' })
})

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`)
})`,
    "next": `import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({ message: 'Welcome to the Next.js Web App!' })
})`,
    "react": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`
  }
}

export async function generateCode(resourceId: string, resourceType: string): Promise<string> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  // In a real implementation, you would:
  // 1. Get the resource details from your backend
  // 2. Generate appropriate code based on the resource configuration
  // 3. Store the generated code in your backend
  // For now, we'll return a template based on the resource type
  return codeTemplates[resourceType as keyof CodeTemplate]["http-trigger"] || ""
}

export async function deployCode(resourceId: string, resourceType: string): Promise<void> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  // In a real implementation, you would:
  // 1. Get the generated code from your backend
  // 2. Use Azure SDK to deploy the code to the resource
  // 3. Handle deployment status and errors
  // For now, we'll just simulate a delay
  await new Promise(resolve => setTimeout(resolve, 2000))
}

export async function downloadCode(resourceId: string, resourceType: string): Promise<void> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  // In a real implementation, you would:
  // 1. Get the generated code from your backend
  // 2. Create a zip file with the code
  // 3. Trigger the download
  // For now, we'll just simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))
} 