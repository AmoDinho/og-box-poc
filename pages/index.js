import App from "../components/App";
import { base } from "../lib/airtable";
const IndexPage = ({ ids }) => (
  <App>
    <h1 className="text-green-500">WELCOME TO SASSY WORLD</h1>
    {ids.map((id) => (
      <p className="text-black">{id}</p>
    ))}
  </App>
);

export async function getStaticProps() {
  let ids = [];
  try {
    const result = await base("Products").select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view",
      fields: ["ID", "Name"],
    });

    result.eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.map((record) => {
          console.log("Retrieved", typeof record.get("ID"));

          ids.push(record.get("ID"));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      ids,
    },
  };
}

export default IndexPage;
