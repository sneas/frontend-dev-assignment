import React, { PureComponent } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { getQuery } from "./get-query";
import { doSearch } from "./do-search";
import * as api from "../../utils/api";

const query = getQuery(window);

class App extends PureComponent {
  state = {
    query,
    submittedQuery: query
  };

  constructor(props) {
    super(props);
    this.form = undefined;
  }

  handleQueryChange = query => {
    this.setState({ query });
  };

  handleSelect = () => {
    this.form.submit();
  };

  render() {
    return (
      <div className="container pt-1">
        <form
          method="get"
          ref={form => {
            this.form = form;
          }}
        >
          <SearchBox
            name="query"
            value={this.state.query}
            doSearch={doSearch(api.search)}
            onChange={this.handleQueryChange}
            onSelect={this.handleSelect}
          />
        </form>
        <p>
          Ik ben makelaar in koffi, en woon op de Lauriergracht No 37. Het is
          mijn gewoonte niet, romans te schrijven, of zulke dingen, en het heeft
          dan ook lang geduurd, voor ik er toe overging een paar riem papier
          extra te bestellen, en het werk aan te vangen, dat gij, lieve lezer,
          zoâven in de hand hebt genomen, en dat ge lezen moet als ge makelaar
          in koffie zijt, of als ge wat anders zijt. Niet alleen dat ik nooit
          iets schreef wat naar een roman geleek, maar ik houd er zelfs niet
          van, iets dergelijks te lezen, omdat ik een man van zaken ben.
        </p>

        <p>
          Sedert jaren vraag ik mij af, waartoe zulke dingen dienen, en ik sta
          verbaasd over de onbeschaamdheid, waarmee een dichter of
          romanverteller u iets op de mouw durft spelden, dat nooit gebeurd is,
          en meestal niet gebeuren kan.Als ik in mijn vak -- ik ben makelaar in
          koffie, en woon op de Lauriergracht No 37 -- aan een principaal -- een
          principaal is iemand die koffie verkoopt -- een opgave deed, waarin
          maar een klein gedeelte der onwaarheden voorkwam, die in gedichten en
          romans de hoofdzaak uitmaken, zou hij terstond Busselinck & Waterman
          nemen.
        </p>

        <dl className="inline">
          <dt className="txt-strong">Entered query</dt>
          <dd>{this.state.query}</dd>
        </dl>
      </div>
    );
  }
}

export default App;
