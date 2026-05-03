# Blue Lily Agent Hub

A responsive phone, tablet and laptop app for Blue Lily agents to access tools, documents and small apps.

## Current Tools

- PropCTRL
- TVA
- Loom
- CMA Builder
- Bond Calculator
- Photo Edits

## How to deploy on GitHub + Netlify

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository.
3. Connect the repository to Netlify.
4. Use these Netlify settings:
   - Build command: leave blank
   - Publish directory: `/`
5. Deploy.

## How to add more tools

Open `app.js` and add new tool cards inside the `toolSections` array.


Version 4 updates:
- Hero section removed.
- Agent tools now load directly below the top bar.
- Tool card blue icon blocks removed.
