# Azure Architecture Diagram Generator

A modern web application that helps you design, visualize, and deploy Azure architectures using AI-powered assistance. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎨 Architecture Design
- AI-powered architecture generation from natural language descriptions
- Interactive drag-and-drop diagram interface
- Real-time visualization of Azure resources and their connections
- Support for various Azure resource types including:
  - Function Apps
  - Web Apps
  - SQL Databases
  - Cosmos DB
  - Storage Accounts
  - Virtual Machines
  - And many more...

### 💻 Code Generation
- Automatic code generation for Function Apps and Web Apps
- Real-time code preview with file tree navigation
- Support for multiple programming languages and frameworks:
  - TypeScript for Azure Functions
  - Express.js for Web Apps
  - Next.js for Web Apps
  - React for Web Apps

### 🚀 Deployment
- One-click deployment to Azure
- ARM template generation and export
- Direct code deployment to Azure resources
- Deployment status tracking

### 📊 Cost Analysis
- Bill of Materials (BOM) generation
- Cost estimation for Azure resources
- Monthly cost breakdown
- Resource pricing details

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **Authentication**: Custom implementation with Google and Microsoft sign-in
- **Diagram Visualization**: Custom implementation with React Flow

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Azure subscription (for deployment features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/azure-architecture-diagram.git
   cd azure-architecture-diagram
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   AZURE_CLIENT_ID=your_client_id
   AZURE_TENANT_ID=your_tenant_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
azure-architecture-diagram/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── chat/              # Main chat interface
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ai-prompt-form.tsx # AI prompt input
│   ├── arm-template-options.tsx
│   ├── azure-architecture-diagram.tsx
│   ├── bom-view.tsx
│   ├── chat-sidebar.tsx
│   ├── code-deployment-options.tsx
│   ├── code-generation-preview.tsx
│   ├── diagram-view.tsx
│   ├── navbar.tsx
│   └── resource-form.tsx
├── lib/                   # Utility functions and types
│   ├── auth.ts
│   ├── code-generation.ts
│   └── types.ts
└── public/               # Static assets
```

## Usage

1. **Design Your Architecture**
   - Visit the landing page and sign in
   - Use the AI prompt to describe your desired architecture
   - Add, remove, or modify resources using the interactive diagram

2. **Generate Code**
   - Select a Function App or Web App from your architecture
   - Click "Generate Code" to create the initial codebase
   - Preview and modify the generated code
   - Download or deploy directly to Azure

3. **Deploy to Azure**
   - Generate and review the ARM template
   - Choose to deploy directly or export the template
   - Monitor deployment status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Azure SDK](https://github.com/Azure/azure-sdk-for-js)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) 