import { Helmet } from "react-helmet";

const TitlePage = (props: { titlePage: string }) => {
  const { titlePage } = props;
  return (
    <div>
      <Helmet>
        <title>{titlePage}</title>
      </Helmet>
    </div>
  );
}

export default TitlePage;
