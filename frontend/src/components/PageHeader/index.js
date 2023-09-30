import "./index.css";

const PageHeader = ({ heading }) => {
  return (
    <section className="page-header">
      <h1>{heading}</h1>
    </section>
  );
};

export default PageHeader;
