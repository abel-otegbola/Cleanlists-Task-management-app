import "./footer.css"

const Footer = () => {
    return (
        <footer>
            <a href="/">Abel designs</a>
            <div>
                <p>Copyright &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;