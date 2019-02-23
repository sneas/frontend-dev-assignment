import React, { Component } from "react";
import SearchBox from "../SearchBox/SearchBox";
import * as api from "../../utils/api";
import { getQuery } from "./get-query";

const search = query =>
  api.search(query).then(res =>
    res.map(suggestion => ({
      label: `${suggestion.searchterm} (${suggestion.nrResults})`,
      value: suggestion.searchterm
    }))
  );

class App extends Component {
  constructor(props) {
    super(props);

    const query = getQuery(window);

    this.state = {
      query,
      submittedQuery: query
    };
  }

  form;

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
            doSearch={search}
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

          <dt className="txt-strong">Submitted query</dt>
          <dd>{this.state.submittedQuery}</dd>
        </dl>
      </div>
    );
  }
}

export default App;
