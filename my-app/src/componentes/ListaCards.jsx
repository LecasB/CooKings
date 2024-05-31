import CardInicial from "./CardInicial";

const ListaCard = ({ dados, user }) => {
  return dados.map((dado) => (
    <CardInicial
      id={dado.idrecipe}
      titulo={dado.name}
      texto={dado.description}
      img={dado.image}
      user={user}
    />
  ));
};

export default ListaCard;
