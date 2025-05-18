// def digits(n):
//     """Return list of digits of n (in decimal)."""
//     return [int(d) for d in str(abs(n))]

// def next_results(n):
//     """
//     Given n, return a list of (result, explanation_string).
//     """
//     ds = digits(n)
//     results = []

//     # Sum
//     s = sum(ds)
//     sum_expr = " + ".join(str(d) for d in ds) + f" = {s}"
//     results.append((s, sum_expr))

//     # Product
//     p = 1
//     for d in ds:
//         p *= d
//     prod_expr = " * ".join(str(d) for d in ds) + f" = {p}"
//     results.append((p, prod_expr))

//     # Difference (only for two-digit numbers)
//     if 10 <= abs(n) <= 99:
//         a, b = ds
//         diff = abs(a - b)
//         diff_expr = f"|{a} - {b}| = {diff}"
//         results.append((diff, diff_expr))

//     return results

// def explore(n, seen=None, path=None, ops=None):
//     """
//     Recursively explore all chains of operations starting from n.
//     Returns a list of tuples (final_digit, path_list, operations_list).
//     """
//     if seen is None:
//         seen = set()
//     if path is None:
//         path = [n]
//     if ops is None:
//         ops = []

//     key = (n, tuple(path))
//     if key in seen:
//         return []
//     seen.add(key)

//     if abs(n) < 10:
//         return [(n, path, ops)]

//     results = []
//     for nxt, expr in next_results(n):
//         results.extend(explore(nxt, seen, path + [nxt], ops + [expr]))
//     return results

// def process_number(n):
//     """Run the exploration and print only paths that end in 7, with full operations shown."""
//     finals = explore(n)

//     reached_7 = [(pth, ops) for fd, pth, ops in finals if fd == 7]

//     if reached_7:
//         print(f"\nPaths from {n} that end in 7:")
//         for path, ops in reached_7:
//             print("  " + " → ".join(str(x) for x in path))
//             for i, op in enumerate(ops):
//                 print(f"    Step {i + 1}: {op}")
//         print("\n>>> YES: 7 was reached!")
//     else:
//         print(f"\n>>> NO: 7 was NOT reached from {n}.")

// if __name__ == "__main__":
//     try:
//         num = int(input("Enter a number to explore: "))
//         process_number(num)
//     except ValueError:
//         print("Invalid input. Please enter an integer.")
