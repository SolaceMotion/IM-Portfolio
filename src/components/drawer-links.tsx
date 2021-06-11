import { Link } from "react-router-dom"
export default function DrawerLinks({ item, title, isNew }: {item: unknown, title: string, isNew: boolean}): JSX.Element {
    return (
        
        <div>
            <Link key={item as string} to={`/projects/${item}`}>
            {/* Check if projects object iteration is equal to true / has the value true */}
              {title} {isNew === true && (
                  <span style={{color: "rgb(255, 65, 65)"}}>NEW!</span>
              )}
            </Link>
        </div>
    )
}
