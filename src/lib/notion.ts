import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getNotionPage(pageId: string) {
  try {
    const response = await notion.pages.retrieve({ 
      page_id: pageId 
    });
    return response;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
} 