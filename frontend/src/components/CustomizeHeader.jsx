import Title from "./Title";

const CustomizeHeader = () => {
  return (
    <div className="mb-8 text-center">
      <Title text1={"СОБЕРИ"} text2={"СВОЙ ШОКОЛАД"} />
      <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
        Выбери форму, основу, начинку, декор и упаковку
      </p>
    </div>
  );
};


export default CustomizeHeader;