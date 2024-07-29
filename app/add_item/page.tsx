"use client";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const CREATE_ITEM_CONTRIBUTION = gql`
  mutation Mutation(
    $contributorId: ID!,
    $date: DateTime!,
    $details: String!,
    $itemName: String!,
    $value: Float!,
    $items: Int!
  )
  {
    createOtherContribution(
      contributorId: $contributorId,
      date: $date,
      details: $details,
      itemName: $itemName,
      value: $value,
      items: $items
    )
  }
`;

export default function Add_Item() {

  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState(0);
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState("");
  const [createOtherContribution, { loading, error, data }] = useMutation(CREATE_ITEM_CONTRIBUTION);
  const contributorId = "fee9a62e-b403-4162-8e43-deb6b879ac9";

  const router = useRouter()

  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/project_home">Project Home</a> {"<"} <a href="/project_options">Project Options</a> {"<"} <a href="/add_contribution">Add Contribution</a></p>
      </div>
      <div>
        <h1>Contribute An Item</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            createOtherContribution({ variables: { contributorId, itemName, items, value, details, date: new Date().toLocaleString() } });
            router.push('/thanks_page', { scroll: false })
          }}
        >
          <div>
            <label>Item:
              <br />
              <input
                required type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div>
            <label>Quantity:
              <br />
              <input
                required type="number"
                min="1"
                value={items}
                onChange={(e) => setItems(parseInt(e.target.value))}
              />
            </label>
          </div>
          <br />
          <div>
            <label>Value per piece(CAD):
              <br />
              <input
                required type="number"
                min="0"
                step="0.01"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <br />
          <div>
            <label>Description(optional):
              <br />
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </label>
          </div>
          <br /><br />
          <input className="button" type="Submit"></input>
        </form>
      </div>
    </div>
  )
}
