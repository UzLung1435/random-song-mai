# ==========================================================
# 脚本功能：批量重命名 UI_Jacket_xxxxxx_S.png 为 xxxxxx_s.png
# 使用方法：在包含图片的目录下运行此脚本
# ==========================================================

# 1. 获取当前目录下所有匹配模式的文件
$files = Get-ChildItem -Filter "UI_Jacket_*_S.png"

# 检查是否存在匹配的文件
if ($null -eq $files) {
    Write-Host "未找到匹配的文件。" -ForegroundColor Yellow
    exit
}

Write-Host "开始处理文件..." -ForegroundColor Cyan

# 2. 遍历每个文件并执行重命名
foreach ($file in $files) {
    # 获取原始文件名
    $oldName = $file.Name
    
    # 逻辑处理：
    # - Replace("UI_Jacket_", ""): 移除前缀
    # - Replace("_S.png", "_s.png"): 将大写 S 换成小写 s
    $newName = $oldName.Replace("UI_Jacket_", "").Replace("_S.png", "_s.png")
    
    # 执行重命名操作
    try {
        Rename-Item -Path $file.FullName -NewName $newName -ErrorAction Stop
        Write-Host "成功: $oldName -> $newName" -ForegroundColor Green
    }
    catch {
        Write-Warning "失败: 无法重命名 $oldName，可能由于名称冲突或权限问题。"
    }
}

Write-Host "任务完成！" -ForegroundColor Cyan