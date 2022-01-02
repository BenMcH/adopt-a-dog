import Cheerio from "cheerio";

export const getArlAnimals = async (type: 'cat' | 'dog') => {
  const arlData = await fetch(`https://www.arl-iowa.org/adopt/find-a-pet/pet-list/${type}/`);

  const arlText = await arlData.text();

  const arlCheerio = Cheerio.load(arlText);

  return arlCheerio('#petList > a').toArray().map((link) => {
    const href = `https://www.arl-iowa.org${link.attribs.href}`;
    const innerLink = Cheerio.load(link);

    let img = innerLink('img').attr('data-src');
    if (img?.startsWith('/')) {
      img = `https://www.arl-iowa.org${img}`;
    }
    const name = innerLink('.item_title').text();
    const description = innerLink('.item_description').text();

    return {
      href,
      img,
      description,
      name
    }
  });
}
