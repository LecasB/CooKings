import React, { useEffect, useState } from 'react';
import supabase from "../supabaseClient";
import "../estilos/CategoriesChoice.css";
import { Link } from "react-router-dom";


const CategoriesChoice = () => {
    const [categorias, setCategorias] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [step, setStep] = useState(1);

    const getCategorias = async () => {
        try {
            const { data: categoriasData, error: categoriasError } = await supabase.from("Category_Recipes").select();
            const { data: tagsData, error: tagsError } = await supabase.from("Tags").select();
      
            if (categoriasError || tagsError) {
                throw categoriasError || tagsError;
            }
      
            setCategorias(categoriasData);
            setTags(tagsData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        getCategorias();
    }, []);

    const handleNext = () => {
        if (step === 2 && selectedCategorias.length < 3) {
            alert("Please select at least 3 categories.");
            return;
        }
        if (step === 3 && selectedTags.length < 3) {
            alert("Please select at least 3 tags.");
            return;
        }
        setStep(step + 1);
    };

    const handleCategoryChange = (id) => {
        setSelectedCategorias(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleTagChange = (id) => {
        setSelectedTags(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div>
            {step === 1 && (
                <div id="part1">
                    <h1>Bem-vindo ao CooKings!</h1>
                    <h2>Estamos entusiasmados por tê-lo aqui. Para lhe oferecermos as melhores receitas, gostaríamos de saber as suas preferências culinárias.</h2>
                    <h3>Vamos começar esta deliciosa jornada juntos!</h3>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div id="part2">
                    <h1>Escolha Pelo Menos 3 Categorias</h1>
                    <div className="categories-container">
                        {categorias.map((categoria) => (
                            <div 
                                key={categoria.idcategory} 
                                className={`category-item ${selectedCategorias.includes(categoria.idcategory) ? 'selected' : ''}`} 
                                onClick={() => handleCategoryChange(categoria.idcategory)}
                            >
                                {categoria.name}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 3 && (
                <div id="part3">
                    <h1>Escolha Pelo Menos 3 Tags</h1>
                    <div className="tags-container">
                        {tags.map((tag) => (
                            <div 
                                key={tag.idTag} 
                                className={`tag-item ${selectedTags.includes(tag.idTag) ? 'selected' : ''}`} 
                                onClick={() => handleTagChange(tag.idTag)}
                            >
                                {tag.tag}
                            </div>
                        ))}
                    </div>
                    <Link to="/">
                    <button onClick={handleNext}>Next</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default CategoriesChoice;
