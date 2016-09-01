export const storyGenerator = function (Component, defaultProps = {}) {
    return (props = {}, text = "")=> {

        _.defaults(props, defaultProps);

        const storyDescStyle = {
            "font-family": "monospace",
            color: "gray"
        };

        return (
            <div>
                <span style={storyDescStyle}>
                    {text}
                </span>

                <br/><br/>

                <Component {...props}/>
            </div>
        );

    }
};
