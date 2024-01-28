import React from 'react'

export default function Footer(props) {
  props.setSignInButton(true);
  return (
    <footer>
      <div class="container text-center" id="footer">
        <span>Copyright © Brand TiresOnHighways</span>
      </div>
    </footer>
  )
}
