import "../../estilos/IndexPage.css";
let horas;
const BoasText = () => {
	horas = new Date().getHours();
	if (horas >= 0 && horas < 12) {
		return <p className="boas">Good Morning, Chef!</p>;
	} else if (horas >= 12 && horas < 18) {
		return <p className="boas">Good Afternoon, Chef!</p>;
	} else if (horas >= 18 && horas < 24) {
		return <p className="boas">GGood Night, Chef!</p>;
	}
};

export default BoasText;
