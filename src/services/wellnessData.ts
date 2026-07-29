import type { WellnessPlan } from '../types/analysis';

export const wellnessPlans: Record<string, WellnessPlan> = {
  high: {
    riskProfile: 'high',
    days: [
      { day: 1, diet: { breakfast: 'Green smoothie with kale', lunch: 'Grilled salmon with quinoa', dinner: 'Steamed vegetables with brown rice', tips: 'High antioxidant intake recommended' }, exercise: { type: 'Walking', duration: '20 min', intensity: 'low' } },
      { day: 2, diet: { breakfast: 'Oatmeal with berries', lunch: 'Turkey wrap with greens', dinner: 'Baked fish with asparagus', tips: 'Increase omega-3 fatty acids' }, exercise: { type: 'Yoga', duration: '30 min', intensity: 'low' } },
      { day: 3, diet: { breakfast: 'Greek yogurt parfait', lunch: 'Lentil soup with whole bread', dinner: 'Grilled chicken with broccoli', tips: 'Focus on fiber-rich foods' }, exercise: { type: 'Swimming', duration: '25 min', intensity: 'moderate' } },
      { day: 4, diet: { breakfast: 'Avocado toast', lunch: 'Mediterranean salad', dinner: 'Stir-fried tofu with vegetables', tips: 'Reduce processed food intake' }, exercise: { type: 'Cycling', duration: '30 min', intensity: 'moderate' } },
      { day: 5, diet: { breakfast: 'Berry smoothie bowl', lunch: 'Grilled shrimp tacos', dinner: 'Herb-roasted chicken', tips: 'Include cruciferous vegetables' }, exercise: { type: 'Walking', duration: '30 min', intensity: 'low' } },
      { day: 6, diet: { breakfast: 'Whole grain pancakes', lunch: 'Quinoa bowl with veggies', dinner: 'Baked salmon with sweet potato', tips: 'Stay hydrated throughout day' }, exercise: { type: 'Yoga', duration: '40 min', intensity: 'low' } },
      { day: 7, diet: { breakfast: 'Fruit and nut bowl', lunch: 'Vegetable soup', dinner: 'Grilled lean steak with salad', tips: 'Rest and recovery day' }, exercise: { type: 'Stretching', duration: '20 min', intensity: 'low' } },
    ],
  },
  moderate: {
    riskProfile: 'moderate',
    days: [
      { day: 1, diet: { breakfast: 'Scrambled eggs with spinach', lunch: 'Grilled chicken salad', dinner: 'Pasta with vegetable sauce', tips: 'Balance protein and carbs' }, exercise: { type: 'Jogging', duration: '25 min', intensity: 'moderate' } },
      { day: 2, diet: { breakfast: 'Smoothie with banana', lunch: 'Turkey sandwich', dinner: 'Baked cod with vegetables', tips: 'Include lean proteins' }, exercise: { type: 'Cycling', duration: '30 min', intensity: 'moderate' } },
      { day: 3, diet: { breakfast: 'Overnight oats', lunch: 'Chicken wrap', dinner: 'Stir-fried shrimp with rice', tips: 'Add more colorful vegetables' }, exercise: { type: 'Swimming', duration: '30 min', intensity: 'moderate' } },
      { day: 4, diet: { breakfast: 'Greek yogurt with granola', lunch: 'Tuna salad', dinner: 'Grilled pork tenderloin', tips: 'Limit sodium intake' }, exercise: { type: 'Strength Training', duration: '35 min', intensity: 'moderate' } },
      { day: 5, diet: { breakfast: 'Whole wheat toast with avocado', lunch: 'Vegetable stir-fry', dinner: 'Roasted chicken with potatoes', tips: 'Stay consistent with meals' }, exercise: { type: 'Jogging', duration: '30 min', intensity: 'moderate' } },
      { day: 6, diet: { breakfast: 'Protein pancakes', lunch: 'Mediterranean bowl', dinner: 'Grilled salmon with asparagus', tips: 'Include omega-3 sources' }, exercise: { type: 'Yoga', duration: '45 min', intensity: 'moderate' } },
      { day: 7, diet: { breakfast: 'Fruit salad', lunch: 'Light soup', dinner: 'Lean beef with vegetables', tips: 'Active recovery day' }, exercise: { type: 'Walking', duration: '40 min', intensity: 'low' } },
    ],
  },
  low: {
    riskProfile: 'low',
    days: [
      { day: 1, diet: { breakfast: 'Omelet with vegetables', lunch: 'Grilled chicken Caesar', dinner: 'Salmon with quinoa', tips: 'Maintain balanced nutrition' }, exercise: { type: 'Running', duration: '30 min', intensity: 'high' } },
      { day: 2, diet: { breakfast: 'Smoothie bowl', lunch: 'Turkey burger', dinner: 'Stir-fried beef with broccoli', tips: 'Keep portions reasonable' }, exercise: { type: 'HIIT', duration: '25 min', intensity: 'high' } },
      { day: 3, diet: { breakfast: 'Overnight oats with nuts', lunch: 'Grilled shrimp salad', dinner: 'Chicken pasta primavera', tips: 'Include whole grains' }, exercise: { type: 'Cycling', duration: '40 min', intensity: 'moderate' } },
      { day: 4, diet: { breakfast: 'Avocado egg toast', lunch: 'Mediterranean wrap', dinner: 'Baked fish with sweet potato', tips: 'Stay active throughout day' }, exercise: { type: 'Swimming', duration: '35 min', intensity: 'moderate' } },
      { day: 5, diet: { breakfast: 'Greek yogurt parfait', lunch: 'Chicken and vegetable soup', dinner: 'Grilled steak with salad', tips: 'Hydrate well' }, exercise: { type: 'Strength Training', duration: '40 min', intensity: 'high' } },
      { day: 6, diet: { breakfast: 'Whole grain cereal', lunch: 'Tuna poke bowl', dinner: 'Roasted chicken with vegetables', tips: 'Recovery nutrition important' }, exercise: { type: 'Yoga', duration: '30 min', intensity: 'moderate' } },
      { day: 7, diet: { breakfast: 'Pancakes with fruit', lunch: 'Light sandwich', dinner: 'Grilled salmon', tips: 'Rest and prepare for next week' }, exercise: { type: 'Walking', duration: '30 min', intensity: 'low' } },
    ],
  },
};

export function getWellnessPlan(riskProfile: string): WellnessPlan {
  if (riskProfile === 'high') return wellnessPlans.high;
  if (riskProfile === 'moderate') return wellnessPlans.moderate;
  return wellnessPlans.low;
}
