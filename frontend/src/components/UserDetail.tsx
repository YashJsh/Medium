interface UserDetail{
    label1 : string,
    label2 : string,
    onChange : (e : any)=>void,
    type : string
}
export const UserDetail  = ({ label1, label2, onChange, type} : UserDetail)=>{
    return (
        <>
            <h1>{label1}</h1>
            <input className="border-[1px] border-slate-200 rounded-lg p-[1vh]" type={type} placeholder={label2} onChange={onChange} />
        </>
    )
}