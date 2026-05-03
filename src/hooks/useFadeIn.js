function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    ref.current.querySelectorAll(".fade-in").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}