import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [taskType, setTaskType] = useState("triangles");
  const [difficulty, setDifficulty] = useState([2]);
  const [savedTasks, setSavedTasks] = useState<any[]>([]);

  const taskTemplates = {
    triangles: [
      { level: 1, text: "Найдите периметр треугольника со сторонами 3 см, 4 см и 5 см" },
      { level: 2, text: "В прямоугольном треугольнике катеты равны 6 см и 8 см. Найдите гипотенузу" },
      { level: 3, text: "Докажите, что медиана, проведённая к гипотенузе прямоугольного треугольника, равна половине гипотенузы" },
    ],
    circles: [
      { level: 1, text: "Найдите длину окружности радиусом 5 см" },
      { level: 2, text: "Найдите площадь круга, если длина окружности равна 12π см" },
      { level: 3, text: "Вычислите площадь сектора круга радиусом 10 см с центральным углом 60°" },
    ],
    quadrilaterals: [
      { level: 1, text: "Найдите периметр квадрата со стороной 7 см" },
      { level: 2, text: "Диагонали ромба равны 6 см и 8 см. Найдите его площадь" },
      { level: 3, text: "Докажите, что площадь параллелограмма равна произведению основания на высоту" },
    ],
    angles: [
      { level: 1, text: "Найдите смежный угол, если один из смежных углов равен 65°" },
      { level: 2, text: "Два угла треугольника равны 45° и 60°. Найдите третий угол" },
      { level: 3, text: "Докажите, что сумма углов выпуклого n-угольника равна (n-2)×180°" },
    ],
  };

  const generateTask = () => {
    const tasks = taskTemplates[taskType as keyof typeof taskTemplates];
    const difficultyLevel = difficulty[0];
    const task = tasks.find(t => t.level === difficultyLevel) || tasks[0];
    
    const newTask = {
      id: Date.now(),
      type: taskType,
      difficulty: difficultyLevel,
      text: task.text,
      createdAt: new Date().toLocaleString('ru-RU')
    };
    
    setSavedTasks([newTask, ...savedTasks]);
    
    toast({
      title: "✨ Задание создано!",
      description: "Задача добавлена в ваш список",
    });
  };

  const getTaskTypeLabel = (type: string) => {
    const labels: any = {
      triangles: "Треугольники",
      circles: "Окружности",
      quadrilaterals: "Четырёхугольники",
      angles: "Углы"
    };
    return labels[type] || type;
  };

  const getDifficultyLabel = (level: number) => {
    const labels: any = {
      1: "Базовый",
      2: "Средний",
      3: "Сложный"
    };
    return labels[level] || level;
  };

  const getDifficultyColor = (level: number) => {
    const colors: any = {
      1: "bg-green-100 text-green-800",
      2: "bg-yellow-100 text-yellow-800",
      3: "bg-red-100 text-red-800"
    };
    return colors[level] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Icon name="Shapes" size={48} className="text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Генератор заданий по геометрии
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">Создавайте уникальные задачи для ваших учеников</p>
        </header>

        <Tabs defaultValue="generator" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-12">
            <TabsTrigger value="generator" className="text-base">
              <Icon name="Sparkles" size={18} className="mr-2" />
              Генератор
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-base">
              <Icon name="FileText" size={18} className="mr-2" />
              Мои задания
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-base">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Шаблоны
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6 animate-fade-in">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Settings2" size={24} className="text-primary" />
                  Параметры задания
                </CardTitle>
                <CardDescription>Выберите тип задачи и уровень сложности</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Shapes" size={18} className="text-accent" />
                    Тип задачи
                  </label>
                  <Select value={taskType} onValueChange={setTaskType}>
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="triangles">
                        <span className="flex items-center gap-2">
                          <Icon name="Triangle" size={16} />
                          Треугольники
                        </span>
                      </SelectItem>
                      <SelectItem value="circles">
                        <span className="flex items-center gap-2">
                          <Icon name="Circle" size={16} />
                          Окружности
                        </span>
                      </SelectItem>
                      <SelectItem value="quadrilaterals">
                        <span className="flex items-center gap-2">
                          <Icon name="Square" size={16} />
                          Четырёхугольники
                        </span>
                      </SelectItem>
                      <SelectItem value="angles">
                        <span className="flex items-center gap-2">
                          <Icon name="ArrowRight" size={16} />
                          Углы
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="BarChart3" size={18} className="text-secondary" />
                    Уровень сложности: <Badge className={getDifficultyColor(difficulty[0])}>{getDifficultyLabel(difficulty[0])}</Badge>
                  </label>
                  <Slider
                    value={difficulty}
                    onValueChange={setDifficulty}
                    min={1}
                    max={3}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Базовый</span>
                    <span>Средний</span>
                    <span>Сложный</span>
                  </div>
                </div>

                <Button 
                  onClick={generateTask} 
                  size="lg" 
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  <Icon name="Wand2" size={20} className="mr-2" />
                  Создать задание
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="animate-fade-in">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="FileText" size={24} className="text-primary" />
                  Сохранённые задания ({savedTasks.length})
                </CardTitle>
                <CardDescription>Все ваши созданные задачи</CardDescription>
              </CardHeader>
              <CardContent>
                {savedTasks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Inbox" size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Пока нет сохранённых заданий</p>
                    <p className="text-sm">Создайте первое задание в генераторе!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedTasks.map((task) => (
                      <Card key={task.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-2">
                              <Badge variant="outline">{getTaskTypeLabel(task.type)}</Badge>
                              <Badge className={getDifficultyColor(task.difficulty)}>
                                {getDifficultyLabel(task.difficulty)}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">{task.createdAt}</span>
                          </div>
                          <p className="text-base leading-relaxed">{task.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(taskTemplates).map(([key, templates]) => (
                <Card key={key} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon 
                        name={key === 'triangles' ? 'Triangle' : key === 'circles' ? 'Circle' : key === 'quadrilaterals' ? 'Square' : 'ArrowRight'} 
                        size={20} 
                        className="text-primary" 
                      />
                      {getTaskTypeLabel(key)}
                    </CardTitle>
                    <CardDescription>{templates.length} шаблонов</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {templates.map((template, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <Badge className={getDifficultyColor(template.level)} variant="outline">
                          Уровень {template.level}
                        </Badge>
                        <p className="text-sm mt-2">{template.text}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
