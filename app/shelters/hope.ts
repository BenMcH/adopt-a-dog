import Cheerio from 'cheerio'

export const getHopeAnimals = async (type: 'cat' | 'dog') => {
  const upperType = type.charAt(0).toUpperCase() + type.slice(1);
  const hopeRequest = await fetch(`https://fpm.petfinder.com/petlist/petlist.cgi?shelter=IA229&limit=100&animal=${upperType}&style=4`);
  const hopeText = await hopeRequest.text();
  const hopeCheerio = Cheerio.load(hopeText);

  return hopeCheerio('.each_pet').toArray().map((link) => {
    const innerLink = Cheerio.load(link);
	const href = innerLink('a').attr('href');

    let img = innerLink('img.pets').attr('src');
    const name = innerLink('img.pets').attr('alt');
    const description = `${innerLink('.name').text()} - ${innerLink('.age').text()} - ${innerLink('.size').text()} ${innerLink('.breed').text()}`;

    return {
      href,
      img,
      description,
      name
    }
  })
}
