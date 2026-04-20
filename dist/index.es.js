import { useEffect as e, useRef as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/SearchInput/SearchInput.tsx
var a = ({ value: a, onChange: o, placeholder: s = "", debounceMs: c = 0, disabled: l = !1, "aria-label": u }) => {
	let d = c < 0 ? 0 : c;
	e(() => {
		c < 0 && console.warn("SearchInput: debounceMs cannot be negative, coercing to 0");
	}, [c]);
	let [f, p] = n(a);
	e(() => {
		p(a);
	}, [a]);
	let m = t(o);
	return e(() => {
		m.current = o;
	}, [o]), e(() => {
		if (d === 0) {
			m.current(f);
			return;
		}
		let e = setTimeout(() => {
			m.current(f);
		}, d);
		return () => clearTimeout(e);
	}, [f, d]), /* @__PURE__ */ i("div", {
		style: { position: "relative" },
		children: [/* @__PURE__ */ r("input", {
			type: "text",
			value: f,
			onChange: (e) => {
				p(e.target.value);
			},
			placeholder: s,
			disabled: l,
			"aria-label": u,
			style: {
				padding: "0.5rem",
				border: "1px solid #d1d5db",
				borderRadius: "0.375rem",
				width: "100%",
				boxSizing: "border-box",
				paddingRight: f ? "2rem" : "0.5rem"
			}
		}), f && !l && /* @__PURE__ */ r("button", {
			onClick: () => {
				p("");
			},
			"aria-label": "Clear search",
			style: {
				position: "absolute",
				right: "0.5rem",
				top: "50%",
				transform: "translateY(-50%)",
				background: "none",
				border: "none",
				cursor: "pointer",
				fontSize: "1.25rem",
				color: "#6b7280"
			},
			children: "×"
		})]
	});
};
//#endregion
//#region src/components/StatusBadge/StatusBadge.tsx
function o({ status: e, size: t = "md", showIcon: n = !1 }) {
	let r = {
		draft: {
			color: "#374151",
			bg: "#f3f4f6",
			label: "Draft"
		},
		published: {
			color: "#166534",
			bg: "#dcfce7",
			label: "Published"
		},
		archived: {
			color: "#92400e",
			bg: "#fef3c7",
			label: "Archived"
		}
	}[e];
	return /* @__PURE__ */ i("span", {
		"data-testid": "status-badge",
		style: {
			background: r.bg,
			color: r.color,
			fontSize: t === "sm" ? "0.75rem" : "0.875rem"
		},
		children: [n && "✓ ", r.label]
	});
}
//#endregion
//#region src/components/PostCard/PostCard.tsx
function s({ title: e, author: t, status: n, rawExcerpt: a, createdAt: s, onClick: c, footerActions: l }) {
	let u = s instanceof Date && !isNaN(s.getTime());
	return /* @__PURE__ */ i("div", {
		role: c ? "button" : "article",
		tabIndex: c ? 0 : void 0,
		onClick: c,
		onKeyDown: (e) => {
			c && (e.key === "Enter" || e.key === " ") && c();
		},
		children: [
			/* @__PURE__ */ r(o, {
				status: n,
				size: "sm"
			}),
			/* @__PURE__ */ r("h3", { children: e }),
			/* @__PURE__ */ i("p", { children: ["by ", t] }),
			a && /* @__PURE__ */ r("p", { children: a }),
			u && /* @__PURE__ */ r("time", { children: s.toLocaleDateString() }),
			l && /* @__PURE__ */ r("div", {
				onClick: (e) => e.stopPropagation(),
				children: l
			})
		]
	});
}
//#endregion
export { s as PostCard, a as SearchInput, o as StatusBadge };
