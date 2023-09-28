import "./index.css";

const ProfileSection = ({ name, email, phone }) => {
  return (
    <section className="p-section">
      <div className="p-photo-container">
        <img
          src="https://images.unsplash.com/photo-1474447976065-67d23accb1e3"
          alt="Profile"
          draggable={false}
          className="p-photo"
        />
      </div>
      <div className="p-details">
        <p className="p-name">{name}</p>
        <p className="p-field">{email}</p>
        <p className="p-field">{phone}</p>
      </div>
    </section>
  );
};

export default ProfileSection;
