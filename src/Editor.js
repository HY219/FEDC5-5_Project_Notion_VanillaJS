export default function Editor({
  $target,
  initialState = { title: "", content: "" },
  onEditing,
}) {
  const $editor = document.createElement("div");

  // html이 한 번만 렌더링 되도록
  let isinitialize = false;

  this.state = initialState;

  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!isinitialize) {
      $editor.innerHTML = `
            <input type="text" name="title" style="width: 600px" value="${this.state.title}" />
            <textarea name="content" style="width:600px;height:400px;">${this.state.content}</textarea>
        `;
      isinitialize = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;

    const name = target.getAttribute("name");

    // state에 해당하는 name value(title, contents)가 있을 경우 동작
    // 빈 문자열이 false로 처리되는 것 방지
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
