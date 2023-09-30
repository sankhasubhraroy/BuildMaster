import "./index.css";

const PageHeader = ({ heading }) => {
  return (
    <section className="page-header">
      <div className="p-header-container">
        <h1>{heading}</h1>
      </div>
    </section>
  );
};

export default PageHeader;
