<script>
    export let data
</script>

<div class="container">
    <table class="table table-hover table-bordered">
        <thead class="table-light">
            <tr>
                <td align="center" colspan="6">THÔNG TIN HỌC SINH</td>
                <td align="center" colspan="2">MÔN TOÁN</td>
                <td align="center" colspan="2">MÔN VĂN</td>
                <td align="center" colspan="2">MÔN ANH</td>
            </tr>
            <tr>
                <th align="center" scope="col">STT</th>
                <th align="center" scope="col">SBD</th>
                <th align="center" scope="col">Họ và tên học sinh</th>
                <th align="center" scope="col">Ngày sinh</th>
                <th align="center" scope="col">Lớp</th>
                <th align="center" scope="col">Trường</th>
                <th align="center" scope="col">Điểm</th>
                <th align="center" scope="col">Giáo viên</th>
                <th align="center" scope="col">Điểm</th>
                <th align="center" scope="col">Giáo Viên</th>
                <th align="center" scope="col">Điểm</th>
                <th align="center" scope="col">Giáo Viên</th>
                <th align="center" scope="col">Tổng</th>
            </tr>
        </thead>
        <tbody>
            {#each data as score, index}
            <tr>
                <td>{index+1}</td>
                {#each score as info}
                <td>{info}</td>
                {/each}
            </tr>
            {/each}
        </tbody>
    </table>
</div>