import CardInicial from "./CardInicial";

const ListaCard = ({ dados }) => {
  return dados.map((dado) => (
    <CardInicial key={dado.id} titulo={dado.titulo} texto={dado.desc} />
  ));

  /* console.log(dados); */
};

export default ListaCard;
