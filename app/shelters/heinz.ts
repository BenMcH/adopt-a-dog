import Cheerio from 'cheerio'

export const getHeinzAnimals = async (type: 'cat' | 'dog') => {
  const heinzRequest = await fetch(`https://www.aheinz57.com/adopt-a-pet/${type}s/`);
  const heinzText = await heinzRequest.text();
  const heinzCheerio = Cheerio.load(heinzText);

  return heinzCheerio('div.adoptables a.card').toArray().map((link) => {
    const href = `https://www.aheinz57.com${link.attribs.href}`;
    const innerLink = Cheerio.load(link);

    let img = innerLink('img').attr('src');
    if (img?.startsWith('/')) {
      img = `https://www.aheinz57.com${img}`;
    }
    const name = innerLink('img').attr('alt');
    const description = innerLink('.is-size-6').text();

    return {
      href,
      img,
      description,
      name
    }
  })
}
