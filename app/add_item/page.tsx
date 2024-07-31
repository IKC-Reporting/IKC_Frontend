"use client";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CREATE_ITEM_CONTRIBUTION = gql`
  mutation Mutation(
    $contributorId: ID!
    $date: DateTime!
    $details: String!
    $itemName: String!
    $value: Float!
    $items: Int!
  ) {
    createOtherContribution(
      contributorId: $contributorId
      date: $date
      details: $details
      itemName: $itemName
      value: $value
      items: $items
    )
  }
`;

export default function Add_Item() {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState(0);
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState("");
  const [createOtherContribution, { loading, error, data }] = useMutation(
    CREATE_ITEM_CONTRIBUTION
  );
  const [contributorId, setContributorId] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedContributorId = localStorage.getItem("contributorId");
    const storedProjectId = localStorage.getItem("projectId");
    setContributorId(storedContributorId);
    setProjectId(storedProjectId);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contributorId && projectId) {
      createOtherContribution({
        variables: {
          contributorId,
          date: new Date().toISOString(),
          details,
          itemName,
          value,
          items,
        },
      });
      router.push("/thanks_page", { scroll: false });
    } else {
      console.error("Contributor ID or Project ID not found in local storage.");
    }
  };

  return (
    <div>
      <div>
        <p>
          <a href="/org">Organizations</a> {"<"}{" "}
          <a href="/org_home">Organization Home</a> {"<"}{" "}
          <a href="/project_home">Project Home</a> {"<"}{" "}
          <a href="/project_options">Project Options</a> {"<"}{" "}
          <a href="/add_contribution">Add Contribution</a>
        </p>
      </div>
      <div>
        <h1>Contribute An Item</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Item:
              <br />
              <input
                required
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div>
            <label>
              Quantity:
              <br />
              <input
                required
                type="number"
                min="1"
                value={items}
                onChange={(e) => setItems(parseInt(e.target.value))}
              />
            </label>
          </div>
          <br />
          <div>
            <label>
              Value per piece(CAD):
              <br />
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <br />
          <div>
            <label>
              Description(optional):
              <br />
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </label>
          </div>
          <br />
          <br />
          <input className="button" type="Submit"></input>
        </form>
      </div>
    </div>
  );
}
