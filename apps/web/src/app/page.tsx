export default function Home() {
  return (
    <main>
      <div className="bg-primary">
        <h1>Hello world</h1>
      </div>
      <select className="px-2 py-1 rounded-full">
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
      <a href="/about">About</a>
      <article className="prose lg:prose-xl">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </p>
      </article>
    </main>
  );
}
