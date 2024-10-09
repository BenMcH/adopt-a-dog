import { json } from '@remix-run/server-runtime';
import { Link, useLoaderData } from '@remix-run/react';
import { getArlAnimals } from '~/shelters/arl';
import { getHeinzAnimals } from '~/shelters/heinz';
import { getHopeAnimals } from '~/shelters/hope';

// export const meta: MetaFunction = () => {
//   return [
//     { title: 'New Remix App' },
//     { name: 'description', content: 'Welcome to Remix!' },
//   ];
// };

export async function loader() {
  const [arlPuppers, heinzPuppers, hopePuppers] = await Promise.all([
    getArlAnimals('dog'),
    getHeinzAnimals('dog'),
    getHopeAnimals('dog'),
  ]);

  const allPuppers = [...arlPuppers, ...heinzPuppers, ...hopePuppers];
  return json(allPuppers);
}

export const headers = () => {
  return {
    'Cache-Control': 'max-age=600, s-maxage=3600',
  };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-2xl">Dogs for Adoption in Central Iowa</h1>
      <p className="text-lg">
        Looking for a cat instead?{' '}
        <Link to="/cats" className="underline underline-offset-2">
          Meow!
        </Link>
      </p>
      <p className="text-lg">
        There are currently {data.length} dogs looking for new homes. Click on a
        dog to learn more and to give them a loving home.
      </p>
      <ul className="list-none flex flex-wrap gap-5 mt-5 justify-center">
        {data.map((link) => (
          <li
            key={link.href}
            className="border-2 p-5 flex flex-col w-full sm:w-64"
          >
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
