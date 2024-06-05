export default function authHeader() {
  // let user = JSON.parse(localStorage.getItem("user"));

  // if (user) {
    return {

      "Content-Type": "application/vnd.api+json",
      "Accept": "application/vnd.api+json",
    };
  // } else {
  //   return {};
  // }
}
