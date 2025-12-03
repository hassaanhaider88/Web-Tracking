function URIFormateValdater(url) {
  try {
    const parsed = new URL(url);

    // Must be http or https
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

export default URIFormateValdater;
