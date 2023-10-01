const ProjectBlueprints = ({ blueprints }) => {
  return (
    <div className="p-blueprint">
      {blueprints.map((blueprint, index) => (
        <div className="pdf-viewer">
          <embed type="application/pdf" src={blueprint.fileURL}></embed>
          <p>{blueprint.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectBlueprints;
