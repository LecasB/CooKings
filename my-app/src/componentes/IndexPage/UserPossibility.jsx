import "../../estilos/UserPossibility.css";

export const UserPossibility = ({ logo, texto }) => {
  return (
    <div className="user-possibility">
      <div className="user-possibility-img">{logo}</div>
      <div className="user-possibility-texto">
        <p>{texto}</p>
      </div>
    </div>
  );
};
