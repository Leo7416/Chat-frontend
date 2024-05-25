import "../styles/Avatar.sass"

function Avatar({username}:{username:string}) {

    const acronym = (value:string) => value.split(/\s/).reduce((res,word)=> res += word.slice(0,1),'')

    return (
        <div className="avatar-wrapper">
            <span className="username">{acronym(username)}</span>
        </div>
    )
}

export default Avatar