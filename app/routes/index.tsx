import Cheerio from "cheerio";
import { useLoaderData } from "remix";

export async function loader() {
  const arlData = await fetch('https://www.arl-iowa.org/adopt/find-a-pet/pet-list/dog/');

  const arlText = await arlData.text();

  const arlCheerio = Cheerio.load(arlText);

  const arlPuppers = arlCheerio('#petList > a').toArray().map((link) => {
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

  const heinzRequest = await fetch('https://www.aheinz57.com/adopt-a-pet/dogs/');
  const heinzText = await heinzRequest.text();
  const heinzCheerio = Cheerio.load(heinzText);

  const heinzPuppers = heinzCheerio('div.adoptables a.card').toArray().map((link) => {
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


  const allPuppers = [...arlPuppers, ...heinzPuppers]
  return allPuppers;
}

export const headers = () => {
  return {
    "Cache-Control": "max-age=600, s-maxage=3600",
  }
}

type PetListing = {
  href: string
  img: string
  description: string
  name: string
}

export default function Index() {
  const data = useLoaderData<PetListing[]>()

  return (
    <>
      <h1 className="text-2xl">Dogs for Adoption in Central Iowa</h1>
      <h2 className="text-xl">This site currently pulls from the <a className="underline underline-offset-2" href="https://www.arl-iowa.org/">ARL of Iowa</a> and <a className="underline underline-offset-2" href="https://www.aheinz57.com/">AHeinz57</a> rescue.</h2>
      <p className="text-lg">There are currently {data.length} dogs looking for new homes. Click on a dog to learn more and to give them a loving home.</p>
      <p className="text-xs">Note: this site has no affiliation with any animal shelters used as sources. The goal of this site is simply to help puppers and doggos find loving forever homes</p>
      <ul className="list-none flex flex-wrap gap-5 mt-5 justify-center">
        {data.map((link) => (
          <li key={link.href} className="border-2 p-5 flex flex-col w-full sm:w-64">
            <a
              target="_blank"
              href={link.href}
              rel="noreferrer"
              className="flex flex-col items-center"
            >
              <img alt={link.name} src={link.img} width="100" />
              <h3 className="text-xl">{link.name}</h3>
              <p>{link.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
