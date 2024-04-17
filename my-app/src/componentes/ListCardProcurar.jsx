import CardProcurar from "./CardProcurar";

const ListaCardProcurar = ({ dados }) => {
  return dados.map((dado) => (
    <CardProcurar key={dado.id} titulo={dado.titulo} texto={dado.desc} />
  ));
};

export default ListaCardProcurar;
