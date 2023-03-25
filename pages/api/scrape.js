import axios from 'axios';
import cheerio from 'cheerio';

async function fetchItems(scrapeURL) {
  const { data } = await axios.get(scrapeURL);
  const $ = cheerio.load(data);
  const items = [];

  $('a.acl-product-card__title-link').each((index, element) => {
    const name = $(element).find('span.acl-product-card__title--product-name').text();
    const link = new URL($(element).attr('href'), scrapeURL).href;

    const priceText = $(element).parents('.acl-product-card').find('.acl-product-card__price').text().trim();
    const priceMatch = priceText.match(/(\d+)\s*And\s*(\d+)/i);

    let price = '';
    if (priceMatch && priceMatch.length === 3) {
      const dollars = priceMatch[1];
      const cents = priceMatch[2];
      price = `$${dollars}.${cents} / each`;
    } else {
      price = priceText;
    }

    const imageUrl = $(element)
      .parents('.acl-product-card')
      .find('img.acl-image__image')
      .attr('src');

    items.push({
      name,
      price,
      link,
      imageUrl,
    });
  });


  return items;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { scrapeURL } = req.body;

    if (!scrapeURL) {
      res.status(400).json({ error: 'URL is required' });
      return;
    }

    const items = await fetchItems(scrapeURL);
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}