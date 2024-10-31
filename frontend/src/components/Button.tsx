export const Button = ({label1, onClick}: {label1:string,  onClick: (e : any) => void }) => {
    return (
        <>
            <button onClick = {onClick} className="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{label1}</button>
        </>
    );
};
