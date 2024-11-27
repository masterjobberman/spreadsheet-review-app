import * as cheerio from 'cheerio';

export async function extractImageFromUrl(url: string): Promise<string> {
  try {
    // Use a default image if no URL is provided
    if (!url) {
      return '/placeholder-product.png';
    }

    // Add protocol if missing
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;

    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Common selectors for product images
    const selectors = [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
      'meta[property="og:image:secure_url"]',
      'meta[property="product:image"]',
      '#landingImage',
      '.product-image img',
      '.main-image img',
      'img[itemprop="image"]',
      '.product-image-container img',
      '.gallery-image-container img',
      '.product-main-image img',
    ];

    for (const selector of selectors) {
      const element = $(selector);
      if (element.length) {
        const src = element.attr('src') || element.attr('content');
        if (src) {
          // Ensure the URL is absolute
          const imageUrl = src.startsWith('http') ? src : new URL(src, fullUrl).toString();
          return imageUrl;
        }
      }
    }

    // If no image is found, try to find any large image on the page
    const allImages = $('img').filter((_, img) => {
      const width = $(img).attr('width');
      const height = $(img).attr('height');
      return width && height && parseInt(width) > 200 && parseInt(height) > 200;
    });

    if (allImages.length > 0) {
      const src = allImages.first().attr('src');
      if (src) {
        return src.startsWith('http') ? src : new URL(src, fullUrl).toString();
      }
    }

    return '/placeholder-product.png';
  } catch (error) {
    console.error('Error extracting image:', error);
    return '/placeholder-product.png';
  }
}