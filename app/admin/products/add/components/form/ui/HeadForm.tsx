const HeadForm = ({ children }) => {
  return (
    <div className="text-center mb-8  ">
      <h2
        className="text-4xl font-extrabold text-transparent bg-gradient-to-r
             from-slate-100 via-gray-200 to-white w-fit mx-auto  bg-clip-text "
      >
        {children}
      </h2>
    </div>
  );
};

export default HeadForm;