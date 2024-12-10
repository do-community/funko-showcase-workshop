import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../components/Header/Header";
import FunkoCard from "../components/FunkoCard/FunkoCard";
import { useEffect, useState } from "react";
import { IndexProps } from "../types";
import { Funko } from "../types/funko";
import AddFunkoButton from "../components/AddFunkoButton/AddFunkoButton";
import { SearchBar } from "../components/SearchBar/SearchBar";

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    const client = await clientPromise;
    const db = client.db("funko-showcase");
    const funkos = await db.collection("funkos").find({}).limit(30).toArray();

    return {
      props: {
        isConnected: true,
        funkosFetch: JSON.parse(JSON.stringify(funkos)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, funkosFetch: [] },
    };
  }
};

export default function Home({
  isConnected,
  funkosFetch,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [search, setSearch] = useState("");
  const [funkos, setFunkos] = useState(funkosFetch);

  useEffect(() => {
    const filterFunkos = (funko: Funko) => {
      return (
        funko?.tvShow?.toLowerCase()?.includes(search.toLowerCase()) ||
        funko?.character?.toLowerCase()?.includes(search.toLowerCase())
      );
    };

    const filteredFunkos = funkos.filter(filterFunkos);
    setFunkos(filteredFunkos);
  }, [search]);

  return (
    <>
      <Head>
        <title>Funko Showcase</title>
        <meta name="description" content="Funko Showcase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth="lg">
        <SearchBar setSearch={setSearch} />
        <AddFunkoButton setFunkos={setFunkos} />
        <main>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4}>
            <FunkoCard funkos={funkos} />
          </Box>
        </main>
      </Container>
      <footer>
        <a
          href="https://www.digitalocean.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img
            src="/do-blue-h-logo.png"
            alt="DigitalOcean Logo"
            className="logo"
          />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        header {
          margin-bottom: 4rem;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .subtitle {
          font-size: 2rem;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
        .logo {
          height: 1em;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
