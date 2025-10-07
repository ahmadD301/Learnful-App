import { motion } from "framer-motion";

function StatCard({ title, value, Icon, index, trend }) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <div className="relative overflow-hidden bg-base-100 border border-base-300 rounded-xl shadow-md">
        <div className="flex flex-row items-center justify-between px-4 pt-4 pb-2">
          <h3 className="text-sm font-medium text-base-content/70">{title}</h3>
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="px-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-3xl font-bold text-base-content"
          >
            {value.toLocaleString()}
          </motion.div>

          {trend && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // transition={{ delay: index * 0.1 + 0.4 }}
              transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.4,
              ease: [0.25, 0.1, 0.25, 1],
              
            }}
              className={`mt-2 text-xs font-medium ${
                trend.isPositive ? "text-success" : "text-error"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}% from last month
            </motion.p>
          )}
        </div>

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 rounded-xl"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
export default StatCard;