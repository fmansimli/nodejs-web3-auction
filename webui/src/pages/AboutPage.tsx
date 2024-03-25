import MyLink from "../components/ui/MyLink";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-1">
      <div className="container my-20 flex flex-1 flex-col gap-5 text-gray-500 dark:text-gray-400">
        <div className="text-xl font-bold text-gray-900 dark:text-white lg:text-3xl">
          About Us.
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-bold text-gray-900 dark:text-white lg:text-2xl">
              We are Web3 people too.
            </div>
            <div className="text-md max-w-full border-l-2 border-gray-200 bg-white pl-5 leading-8 dark:border-gray-700 dark:bg-gray-800 lg:max-w-xl lg:text-lg">
              Stepping into the realm of Web3, we're not just participants; we're architects of
              a decentralized tomorrow. With Ethereum as our canvas, we're painting a future
              where trust, transparency, and boundless creativity intersect.
            </div>
          </div>
          <div className="h-full w-full rounded-lg border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8 lg:w-1/2">
            <h5 className="text-center text-xl font-bold leading-8 text-gray-900 dark:text-white lg:text-left lg:text-2xl">
              Let's build the future together.
            </h5>
            <div className="text-md my-8 leading-7 lg:text-lg">
              Let's build the future together, where innovation thrives and boundaries
              dissolve. With Ethereum as our cornerstone, let's craft a decentralized landscape
              that redefines what's possible.
            </div>
            <MyLink to="/contact">Contact Us</MyLink>
          </div>
        </div>

        <section className="mt-10 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <h1 className="mb-4 text-xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white lg:text-2xl">
              We invest in the world’s potential
            </h1>
            <p className="text-md mb-8  font-normal leading-7 text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-lg">
              We invest in the world’s potential, cultivating tomorrow's promise with every
              choice we make.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <a
                href="https://remix.ethereum.org/"
                className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
              </a>
              <a
                href="https://ethereum.org/"
                className="dark:hover:bg-gray-70 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 sm:ms-4">
                Learn more
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
