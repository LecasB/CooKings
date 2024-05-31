import CardInicial from "./CardInicial";

const ListaCard = ({ dados }) => {
  return dados.map((dado) => (
    <CardInicial key={dado.id} titulo={dado.name} texto={dado.description} img={dado.image} />
  ));

  /* console.log(dados); */
};

export default ListaCard;
