import React from "react";
import { storiesOf } from "@storybook/react";
import SearchBox from "../components/SearchBox/SearchBox";
import { doSearch } from "../components/App/do-search";
import * as api from "./mock-api";
import "../index.css";
import SearchInput from "../components/SearchInput/SearchInput";
import SuggestionBox from "../components/SuggestionBox/SuggestionBox";
import { suggestions } from "../components/__test__/suggestions";

const mockSearch = doSearch(api.search);

storiesOf("SearchInput", module)
  .add("Empty value", () => <SearchInput value="" />)
  .add("Non-empty value", () => <SearchInput value="something" />);

storiesOf("SuggestionBox", module).add("Filled in value", () => (
  <SuggestionBox suggestions={suggestions.tru} />
));

storiesOf("SearchBox", module)
  .add("Empty value", () => (
    <div>
      <p>Enter "tru" to see result</p>
      <SearchBox doSearch={mockSearch} />
    </div>
  ))
  .add("Non-empty value", () => (
    <SearchBox value="trui" doSearch={mockSearch} />
  ));
