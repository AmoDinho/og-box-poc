import App from "../components/App";
import { base } from "../lib/airtable";
const IndexPage = () => (
  <App>
    <h1 className="text-green-500">WELCOME TO SASSY WORLD</h1>
  </App>
);

export async function getStaticProps() {
  base("Products")
    .select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.map((record) => {
          console.log("Retrieved", record.get("ID"));
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
}

export default IndexPage;
