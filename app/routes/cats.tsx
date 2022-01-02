import { Link, useLoaderData } from "remix";
import { getArlAnimals } from "~/shelters/arl";
import { getHeinzAnimals } from "~/shelters/heinz";

export async function loader() {
  const [arlMittens, heinzMittens] = await Promise.all([
    getArlAnimals('cat'),
    getHeinzAnimals('cat')
  ]);

  const allMittens = [...arlMittens, ...heinzMittens]
  return allMittens;
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
      <h1 className="text-2xl">Cats for Adoption in Central Iowa</h1>
      <p className="text-lg">Not a cat person? <Link to="/" className="underline underline-offset-2">Check out these dogs instead!</Link></p>
      <p className="text-lg">There are currently {data.length} cats looking for new homes. Click on a cat to learn more and to give them a loving home.</p>
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
